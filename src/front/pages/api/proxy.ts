import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'http://localhost:2222',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/api/proxy': '' },
  xfwd: true,
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
