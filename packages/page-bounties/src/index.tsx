// Copyright 2017-2020 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@polkadot/react-components';
import basicMd from './md/basic.md';
import Overview from './Overview';
import { useTranslation } from './translate';

interface Props {
  basePath: string;
}

function BountiesApp ({ basePath }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Bounties overview')
    }
  ], [t]);

  return (
    <main className='bounties--App'>
      <HelpOverlay md={basicMd as string} />
      <header>
        <Tabs
          basePath={basePath}
          items={items}
        />
      </header>
      <Switch>
        <Route>
          <Overview/>
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(BountiesApp);
