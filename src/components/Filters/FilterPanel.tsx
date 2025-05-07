import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  setCategories,
  toggleCategory,
  setPriceRange,
} from "../../redux/slices/filterSlice";
import { Panel, Section, Label, RangeInput } from "./FilterPanel.styles";

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const { categories, selectedCategories, priceRange } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    dispatch(setCategories(cats));
  }, [products, dispatch]);

  return (
    <Panel>
      <Section>
        <h3>Categorias</h3>
        {categories.map(cat => (
          <Label key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => dispatch(toggleCategory(cat))}
            />
            {cat}
          </Label>
        ))}
      </Section>
      <Section>
        <h3>Faixa de Preço (R$)</h3>
        <div>
          <RangeInput
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={e =>
              dispatch(
                setPriceRange([Number(e.target.value), priceRange[1]])
              )
            }
          />
          <RangeInput
            type="number"
            min={priceRange[0]}
            max={10000}
            value={priceRange[1]}
            onChange={e =>
              dispatch(
                setPriceRange([priceRange[0], Number(e.target.value)])
              )
            }
          />
        </div>
      </Section>
    </Panel>
  );
};

export default FilterPanel;