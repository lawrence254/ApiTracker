export type DataResponse = {
  results: {
    provider: string;
    Site_Alias: string;
    date_registered: string;
    keyID: string;
    id: number;
    data: {
      Key: string;
      Rate_Limited: string;
      Rate_Per_Hour: string;
      User_Email: string;
    };
  };
};
