import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const About = () => (
  <>
    <Segment>
      <Header as="h3">关于</Header>
      GitHub:{' '}
      <a href="https://github.com/HunterWangwei/wechat-server">
        https://github.com/HunterWangwei/wechat-server
      </a>
    </Segment>
  </>
);

export default About;
