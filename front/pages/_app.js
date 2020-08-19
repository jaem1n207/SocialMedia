import PropTypes from "prop-types";
import withReduxSaga from "next-redux-saga";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
import globalStyles from "../styles/global";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="logo icon" href="/static/favicon.png" />
        <title>Social Media</title>
      </Head>
      <style jsx global>
        {globalStyles}
      </style>
      <Component />
    </>
  );
};

App.protoTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
