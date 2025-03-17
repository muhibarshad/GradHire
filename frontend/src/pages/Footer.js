import { Layout, Grid } from "antd";
import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const { Footer } = Layout;
const { useBreakpoint } = Grid;

function AppFooter() {
  const screens = useBreakpoint();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(screens.xs || (screens.sm && !screens.md));
  }, [screens]);

  return (
    <Footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div
          className={styles.footerLinks}
          style={{
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "1rem" : "6rem",
          }}
        >
          <div className={styles.footerItem}>
            <span>Alright reserved © {new Date().getFullYear()} Recruuit</span>
          </div>
          <div className={styles.footerItem}>
            <span>Any Inquiry ?</span>
          </div>
          <div className={styles.footerItem}>
            <span>Privacy Policy | Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default AppFooter;
