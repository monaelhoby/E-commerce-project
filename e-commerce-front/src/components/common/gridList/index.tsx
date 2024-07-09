import { Row, Col } from "react-bootstrap";

import LottieHandler from "@components/feedback/lottieHandler";

type GridListProps<T, > = {
  records: T[],
  renderItem: (record: T) => React.ReactNode,
  message: string
}

type hasId = {id?: number}
const GridList= <T extends hasId>({records, renderItem, message}: GridListProps<T>) => {
  const categoriesList =
  records.length > 0
    ? records.map((record) => (
        <Col
          xs={3}
          key={record.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
         { renderItem(record)}
        </Col>
      ))
    : <Col><LottieHandler type={"empty"} message={message} /></Col>;
  return (
    <Row>{categoriesList}</Row>
  )
}

export default GridList
 