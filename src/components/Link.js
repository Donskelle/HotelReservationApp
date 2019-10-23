import styled from 'styled-components/macro';
import tw from 'tailwind.macro';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${tw`block my-3 no-underline text-blue-600`}
`;

export default StyledLink;
