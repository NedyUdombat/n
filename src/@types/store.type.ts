export type Dispatch = (args: {
  type: string;
  payload?: unknown;
  stateName?: string;
}) => {
  type: string;
  payload?: unknown;
  stateName?: string;
};
