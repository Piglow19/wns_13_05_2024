import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql` 
  query Countries {
    countries {
      code
      emoji
      id
      name
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY = gql`
query Country($code: String!) {
  country(code: $code) {
    id
    code
    name
    emoji
    continent {
      name
    }
  }
} 
`;