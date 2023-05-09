import { SfApiVersion } from './models/models';

const getDefaultSfApiVersion = (): SfApiVersion => {
  try {
    return JSON.parse(process.env.SFDC_API_VERSION);
  } catch (ex) {
    console.error(
      'Error retrieving SFDC_API_VERSION. Falling back to default.',
      ex
    );
    return {
      label: "Spring '23",
      url: '/services/data/v57.0',
      version: '57.0',
    };
  }
};

export const SF_API_VERSION: SfApiVersion = getDefaultSfApiVersion();
