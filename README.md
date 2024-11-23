# CloudFront TypeScript Example

This repository demonstrates how to write, test, and deploy AWS CloudFront Functions using TypeScript. The project includes a sample function, unit tests, and an AWS CDK stack for deployment.

## Features

- **TypeScript Support**: Write CloudFront Functions in TypeScript and transpile them to ES5 JavaScript.
- **Unit Testing**: Use Jest to test your functions before deployment.
- **AWS CDK Integration**: Deploy your CloudFront Functions using AWS CDK.

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- AWS CDK (>= 2.x)
- AWS CLI configured with appropriate permissions

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cloudfront-function-typescript.git
   cd cloudfront-function-typescript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. **Build the Project**:

   ```bash
   npm run build
   ```

2. **Build CloudFront Functions**:

   ```bash
   npm run build:cloudfront
   ```

3. **Run Tests**:

   ```bash
   npm test
   ```

4. **Deploy with CDK**:
   ```bash
   cdk deploy
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

This project uses code inspired by the `typescript-remove-exports` package. Special thanks to its authors for their contributions to the TypeScript community.
