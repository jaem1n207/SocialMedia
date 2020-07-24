import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => (
  <div>
    <div>
      <Link href="/">
        <a>피드</a>
      </Link>
      <Link href="/profile">
        <a>내 프로필</a>
      </Link>
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    </div>
    {children}
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
