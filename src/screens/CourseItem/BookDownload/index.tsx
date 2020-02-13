import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Icon } from 'antd';
import FileSaver from 'file-saver';
import b64toBlob from 'b64-to-blob';

import {
  BookDownloadData,
  BookDownloadItem,
} from '@generated/client';
import { GET_BOOK } from '@queries/book';

import { StyledCards, StyledCard } from '../styles';

type BookDownloadCardProps = {
  item: BookDownloadItem;
};

const BookDownloadCard = ({ item }: BookDownloadCardProps) => {
  const apolloClient = useApolloClient();

  const [isLoading, setIsLoading] = React.useState(false);

  const onDownload = async () => {
    setIsLoading(true);

    const { data } = await apolloClient.query({
      query: GET_BOOK,
      variables: {
        path: item.url,
        fileName: item.fileName || '',
      },
    });

    setIsLoading(false);

    const { fileName, body, contentType } = data.book;

    const blob = b64toBlob(body, contentType);
    FileSaver.saveAs(blob, fileName);
  };

  let actions = [
    <a onClick={onDownload}>
      {isLoading ? <Icon type="loading" /> : 'Download'}
    </a>,
  ];

  return (
    <StyledCard
      title={
        <>
          <Icon type="book" /> {item.label}
        </>
      }
      actions={actions}
    >
      {item.description}
    </StyledCard>
  );
};

type BookDownloadProps = {
  bookDownloadData: BookDownloadData;
};

const BookDownload = ({ bookDownloadData }: BookDownloadProps) => {
  return (
    <StyledCards>
      {bookDownloadData.items.map(item => (
        <BookDownloadCard item={item} />
      ))}
    </StyledCards>
  );
};

export default BookDownload;
