interface IEnvConfig {
  mode: 'production' | 'development';
}

const envConfig = {
  mode: process.env.NODE_ENV,
} as IEnvConfig;

export default envConfig;
