/**
 * This code copied and modified from typescript-remove-exports npm package.
 * https://github.com/tonyhallett/typescript-remove-exports/blob/master/index.ts
 */
import ts = require('typescript')

type SourceFileTransformerFactory = ts.TransformerFactory<ts.SourceFile>

export const removeExportTransformerFactory: SourceFileTransformerFactory = (
  context: ts.TransformationContext
) => {
  return (node: ts.SourceFile) => {
    const visitor: ts.Visitor = (node: ts.Node) => {
      // Remove export keywords
      if (ts.isModifier(node) && node.kind === ts.SyntaxKind.ExportKeyword) {
        return undefined
      }

      // Remove export declarations
      if (ts.isExportDeclaration(node)) {
        return undefined
      }

      // Keep the function declaration but remove its export modifier
      if (ts.isFunctionDeclaration(node)) {
        const modifiers = node.modifiers?.filter((m) => m.kind !== ts.SyntaxKind.ExportKeyword)
        const modifierArray = modifiers ? Array.from(modifiers) : undefined

        return context.factory.createFunctionDeclaration(
          modifierArray,
          node.asteriskToken,
          node.name,
          node.typeParameters,
          node.parameters,
          node.type,
          node.body
        )
      }

      return ts.visitEachChild(node, visitor, context)
    }

    return ts.visitEachChild(node, visitor, context)
  }
}

export const remove__esModuleFactory: SourceFileTransformerFactory = (
  context: ts.TransformationContext
) => {
  const previousOnSubstituteNode = context.onSubstituteNode
  context.enableSubstitution(ts.SyntaxKind.ExpressionStatement)
  context.onSubstituteNode = (hint, node) => {
    node = previousOnSubstituteNode(hint, node)

    if (ts.isExpressionStatement(node)) {
      const expr = node.expression
      if (
        ts.isCallExpression(expr) &&
        ts.isPropertyAccessExpression(expr.expression) &&
        ts.isIdentifier(expr.expression.expression) &&
        expr.expression.expression.text === 'Object' &&
        expr.expression.name.text === 'defineProperty' &&
        expr.arguments.length >= 2 &&
        ts.isIdentifier(expr.arguments[0]) &&
        expr.arguments[0].text === 'exports' &&
        ts.isStringLiteral(expr.arguments[1]) &&
        expr.arguments[1].text === '__esModule'
      ) {
        return context.factory.createEmptyStatement()
      }
    }
    return node
  }
  return (node) => node
}

function getCustomTransformersInternal() {
  const customTransformers: ts.CustomTransformers = {
    before: [removeExportTransformerFactory],
    after: [remove__esModuleFactory],
  }
  return customTransformers
}
export const getCustomTransformers = getCustomTransformersInternal as ts.CustomTransformers
