import BlogNavbar from "./BlogNavbar";
import { useTheme } from 'provider/ThemeProvider';

const { Container } = require("react-bootstrap")


const Pagelayout = ({ children } ) => {
  const { theme, toggleTheme } = useTheme();
  return (
      <div className={theme.type}>
        <Container>
            <BlogNavbar theme={theme}
          toggleTheme={toggleTheme} />
        <div   >
          
                {children}
                </div>
            
            <footer className="page-footer">
    <div>
      <a href="#">courses</a>{' | '}
      <a href="#">github</a>{' | '}
      <a href="#">facebook</a>
    </div>
  </footer>
      </Container>
      <style jsx global>{`
        html, body {
          background: ${theme.background};
          color: ${theme.fontColor};
          transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;
        }
      `}
      </style>
      </div>
    )
}
export default Pagelayout;