// Copyright 2017-2020 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface Props {
  className?: string;
}

function Overview ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <h1>Bounties</h1>
    </div>
  );
}

export default React.memo(Overview);
