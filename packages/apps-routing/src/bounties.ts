// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Route } from './types';

import Component, { useCounter } from '@polkadot/app-bounties';

export default function create (t: <T = string> (key: string, text: string, options: { ns: string }) => T): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.treasury.proposeBounty'
      ]
    },
    group: 'governance',
    icon: 'coins',
    name: 'bounties',
    text: t<string>('nav.bounties', 'Bounties', { ns: 'apps-routing' }),
    useCounter
  };
}
