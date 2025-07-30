export default function CombineContext(...providers) {
  return ({ children }) => {
    return providers.reduceRight((accumulator, CurrentProvider, index) => {
      return <CurrentProvider>{accumulator}</CurrentProvider>;
    }, children);
  };
}
