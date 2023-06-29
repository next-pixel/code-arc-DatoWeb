import Footer from "./footer";
import ScrollToTop from "react-scroll-to-top";
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import googleTagManager from '@analytics/google-tag-manager'

export default function Layout({ preview, children }) {
  const analytics = Analytics({
    app: 'code-arc',
    plugins: [
      googleAnalytics({
        measurementIds: ['G-ZF9XWPZYQ4']
      }),
      googleTagManager({
        containerId: 'G-ZF9XWPZYQ4'
      })
    ]
  })
  return (
    <>
      <div className="min-h-screen">
      
        <main>{children}</main>
      </div>
      <Footer />
      <ScrollToTop smooth color="#6f00ff" />
    </>
  );
}
