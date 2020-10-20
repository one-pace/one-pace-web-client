import React from 'react';

import { withTranslation } from '../core/i18n';

interface Props {
  statusCode?: number;
  t: (text: string, opts?: any) => string;
}

const Error = ({ statusCode, t }: Props) => (
  <p>
    {statusCode
      ? t('error-with-status', { statusCode })
      : t('error-without-status')}
  </p>
);

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

// @ts-ignore
export default withTranslation('common')(Error);
