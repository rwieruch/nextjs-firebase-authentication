import React from 'react';

type ExternalCourseLinkProps = {
  url?: string;
  children: React.ReactNode;
};

const ExternalCourseLink = ({
  url,
  children,
}: ExternalCourseLinkProps) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalCourseLink;
