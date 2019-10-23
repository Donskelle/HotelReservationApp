import styled from 'styled-components/macro';
import tw from 'tailwind.macro';

const Form = styled.form`
  ${tw`mx-auto w-11/12 lg:w-full lg:flex lg:flex-wrap lg:items-stretch`};

  > input,
  select {
    ${tw`w-full h-10 mb-5 lg:w-2/5 lg:flex-grow`};
  }

  > *:nth-child(even) {
    ${tw`lg:ml-auto`};
  }

  > .buttonRow {
    ${tw`lg:w-full`};
  }
`;

export default Form;
