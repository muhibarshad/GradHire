import { Layout } from 'antd'
const { Footer } = Layout

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        borderTop: '1px solid #8c8c8c',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',

            justifyContent: 'center',
            gap: '6rem',
            fontSize: '0.75rem',
            color: '#8c8c8c',
          }}
        >
          <div>
            <span>Alright reserved © 2022 Recruuit</span>
          </div>
          <div>
            <span>Any Inquiry ?</span>
          </div>
          <div>
            <span>Privacy Policy | Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default AppFooter
