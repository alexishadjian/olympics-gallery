/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@use '/app/_styles/mixins.scss' as *;`,
    },
};

export default nextConfig;
