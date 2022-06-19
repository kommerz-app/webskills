import { removeKeys } from './object.utils';

describe('ObjectUtils', () => {
  it('should create', () => {
    const v = {
      deliveryDate: 'sdf',
      dueDate: '2020-07-15',
      invoiceAddress: 'Stellinger Weg',
      invoiceDate: '2020-07-26T16:53:22.751Z',
      invoiceEmail: 'email@gmail.com',
      invoiceItems: [
        {
          name: 'Beratung Senior Fullstack Std.',
          description: 'Beratung',
          unit: {
            id: 'c117c89a-c21f-4870-9cb3-46a25ff2dff6',
            symbol: 'h',
            name: 'Stunde',
            __typename: 'Unit',
          },
          taxRate: 19,
          netPrice: 95,
          quantity: 13,
        },
      ],
      notes: 'sdfsdf',
      subject: 'dsd',
      projectId: '93bca764-0d7d-4940-ac0a-81d10a25e99b',
      templateId: 'c117c89a-c21f-4870-9cb3-46a25aa2daa5',
    };

    removeKeys(v, '__typename');

    expect(v.invoiceItems[0].unit.__typename).toBeUndefined();
  });
});
