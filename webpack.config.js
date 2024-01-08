module.exports = function (options, webpack) {
    return {
      ...options,
      entry: ['./src/main.ts'],
      externals: [],
      output: {
        ...options.output,
        libraryTarget: 'commonjs2',
      },
      plugins: [
        ...options.plugins,
        new webpack.IgnorePlugin({
          checkResource(resource) {
            const lazyImports = [
                '@nestjs/microservices',
                '@nestjs/microservices/microservices-module',
                '@nestjs/websockets/socket-module',
            ]
            return lazyImports.includes(resource);
          },
        }),
      ],
    };
  };