/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@use '/app/_styles/mixins.scss' as *;`,
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(glsl)$/,
          type: 'asset/source'
        })
        return config
    }
};

export default nextConfig;
