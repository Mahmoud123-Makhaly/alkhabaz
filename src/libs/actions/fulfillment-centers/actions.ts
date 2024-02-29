'use server';

import { cache } from 'react';

import { client } from '../client';
import { Schema } from './schema';

export const getFulfillmentCenters = cache(
  client(Schema.getFulfillmentCenters, async (inputs, { _context }) => {
    const { skip, take, fulfillmentCenterIds, query, sort } = inputs ?? {};
    return _context.fulfillmentCenterServices?.getFulfillmentCenters(
      skip?.toString(),
      take,
      query,
      sort,
      fulfillmentCenterIds,
    );
  }),
);
