import { TLoading } from "@customTypes/shared";
import CategorySkeleton from './skeltons/categories'
import ProductSkeleton from "./skeltons/products";
import CartSkeleton from "./skeltons/cart";
import LottieHandler from "./lottieHandler";
import TableSkeleton from "./skeltons/table";

const skeltonsType = {
 category: CategorySkeleton,
 product: ProductSkeleton,
 cart: CartSkeleton,
 table: TableSkeleton
}

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeltonsType // == 'category' | 'product' | 'cart'
};

const Loading = ({ status, error, children, type= 'category' }: LoadingProps) => {

  const TheComponent = skeltonsType[type]

  if (status === "pending") {
    return <TheComponent />;
  }
  if (status === "failed") {
    return <LottieHandler type="error" message={error || ""} />;
  }
  return <div>{children}</div>;
};

export default Loading;