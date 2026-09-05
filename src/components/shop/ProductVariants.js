import React, { useMemo } from 'react';

const ProductVariants = ({ variants, selectedVariant, onChange }) => {
  const optionNames = useMemo(() => Array.from(new Set(
    variants.reduce((names, variant) => [...names, ...Object.keys(variant.options || {})], [])
  )), [variants]);

  if (!variants.length || !selectedVariant) return null;

  const selectOption = (optionName, value) => {
    const nextOptions = { ...selectedVariant.options, [optionName]: value };
    const exact = variants.find((variant) => optionNames.every((name) => variant.options[name] === nextOptions[name]));
    const fallback = variants.find((variant) => variant.options[optionName] === value && variant.available);
    onChange(exact || fallback || selectedVariant);
  };

  return (
    <div className="product-variants">
      {optionNames.map((optionName) => {
        const values = Array.from(new Set(variants.map((variant) => variant.options[optionName]).filter(Boolean)));
        return (
          <fieldset key={optionName}>
            <legend>{optionName}</legend>
            <div className="product-variant-options">
              {values.map((value) => {
                const available = variants.some((variant) => variant.options[optionName] === value && variant.available);
                return (
                  <button
                    key={value}
                    type="button"
                    className={selectedVariant.options[optionName] === value ? 'is-selected' : ''}
                    aria-pressed={selectedVariant.options[optionName] === value}
                    disabled={!available}
                    onClick={() => selectOption(optionName, value)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default ProductVariants;

