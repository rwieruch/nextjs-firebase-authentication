import React from 'react';
import { Skeleton } from 'antd';

import { useGetStorefrontCoursesQuery } from '@generated/client';
import useErrorIndicator from '@hooks/useErrorIndicator';
import Link from '@components/Link';

interface AssetsProps {
  isPartner: boolean;
}

const Assets = ({ isPartner }: AssetsProps) => {
  if (!isPartner) {
    return null;
  }

  const { data, loading, error } = useGetStorefrontCoursesQuery();

  useErrorIndicator({
    error,
  });

  if (loading) return <Skeleton active />;
  if (!data) return null;

  return (
    <>
      <p>
        If not only the referral link but also images are needed on
        the partner's side, you can find all the images that can be
        used freely over here.
      </p>

      <ul>
        {data.storefrontCourses.map(storefrontCourse => (
          <li key={storefrontCourse.courseId}>
            <Link href={storefrontCourse.url}>
              {storefrontCourse.header}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Assets;
