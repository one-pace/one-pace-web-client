import React from 'react';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import Router from 'next/router';

import { useTranslation } from '../core/i18n';

const CustomError = ({ statusCode }: ErrorProps) => {
  const { t } = useTranslation('common');

  return (
    <p>
      {statusCode
        ? t('error-with-status', { statusCode })
        : t('error-without-status')}
    </p>
  );
};

CustomError.getInitialProps = async ({ err, req, res }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404; // eslint-disable-line no-nested-ternary

  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

CustomError.defaultProps = {
  statusCode: 404,
};

export default CustomError;
