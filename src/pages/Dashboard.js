import React from 'react';

import H1 from '../components/typo/H1';
import PageWrapper from '../components/PageWrapper';
import StyledLink from '../components/Link';

export default function Dashboard() {
  return (
    <PageWrapper>
      <H1>Dashboard</H1>
      <p>
        &quot;At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat.&quot;
      </p>
      <StyledLink to="/rooms">Rooms</StyledLink>
      <StyledLink to="/rooms/createreservation">Create Reversation</StyledLink>
    </PageWrapper>
  );
}
