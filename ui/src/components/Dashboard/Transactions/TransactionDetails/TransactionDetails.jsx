import { useParams } from 'react-router-dom';

const TransactionDetails = () => {
  const { transactionId } = useParams();

  return <>Details {transactionId}</>;
};

export default TransactionDetails;
