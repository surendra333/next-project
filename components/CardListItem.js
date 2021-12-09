
import { Card } from "react-bootstrap";
import Link from "next/dist/client/link";

const CardListItem = ({ author,title,subtitle,date,link,mode = 'normal' }) => {

    return (
          <Card className={`fj-card fj-card-list ${mode}`}>
            <div className="card-body-wrapper">
              <Card.Header
                className="d-flex flex-row">
                <img
                  src={author?.image || 'https://via.placeholder.com/150'}
                  className="rounded-circle mr-3"
                  height="50px"
                  width="50px"
                  alt="avatar"/>
            <div>
              {mode === 'placeholder' ?
                <>
                    <Card.Title className="font-weight-bold mb-1">Placeholder Title</Card.Title>
                    <Card.Text className="card-date">Placeholder Date</Card.Text>
                    </>
                :
                 <>
                    <Card.Title className="font-weight-bold mb-1">{author?.title}</Card.Title>
                    <Card.Text className="card-date">{author?.date}</Card.Text>
                    </>
              }
                  </div>
              </Card.Header>
              <Card.Body>
                 {mode === 'placeholder' ?
                <>
                    <Card.Title className="font-weight-bold mb-1">Placeholder Title</Card.Title>
                    <Card.Text className="card-date">Placeholder Date</Card.Text>
                    </>
                :
                 <>
                <Card.Title className="font-weight-bold mb-1">{ title}</Card.Title>
                <Card.Text className="card-date">{subtitle}</Card.Text>
                <p>{ date}</p>
                    </>
              }
              </Card.Body>
        </div>
        {link &&
          <Link  {...link}>
          <a  className="card-button">
            Read More
          </a>
          </Link>
        }
          </Card>
    )
}
export default CardListItem;