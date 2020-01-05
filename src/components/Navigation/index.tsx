import React from 'react';
import Link from 'next/link';

const Navigation = () => (
  <div>
    <Link href="/signin">
      <a>To Sign In Page</a>
    </Link>

    <Link href="/signup">
      <a>To Sign Up Page</a>
    </Link>

    <Link href="/checkout">
      <a>To Sign Up Page</a>
    </Link>
  </div>
);

export default Navigation;
