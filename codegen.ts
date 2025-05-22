import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["./**/*.tsx"],
  generates: {
    "./gql/": {
      preset: "client",
    },
  },
};
export default config;
