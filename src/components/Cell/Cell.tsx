import { CellOptions } from '../../utils/data';

interface Props {
  type: CellOptions;
}

function Cell({ type }: Props) {
  return <div className={`cell ${type}`} />;
}

export default Cell;