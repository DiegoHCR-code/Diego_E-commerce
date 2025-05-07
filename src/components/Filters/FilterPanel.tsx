import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { setCategories, toggleCategory, setPriceRange } from "../../redux/slices/filterSlice";
import { Panel, Section, CategoryList, CategoryItem, PriceRange } from "./FilterPanel.styles";

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const { categories, selectedCategories, priceRange } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    dispatch(setCategories(cats));
  }, [products, dispatch]);

  return (
    <Panel>
      <Section>
        <h3>Categorias</h3>
        <CategoryList>
          {categories.map(cat => (
            <CategoryItem key={cat}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => dispatch(toggleCategory(cat))}
              />
              {cat}
            </CategoryItem>
          ))}
        </CategoryList>
      </Section>

      <Section>
        <h3>Faixa de Preço (R$)</h3>
        <PriceRange>
          <input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={e => dispatch(setPriceRange([Number(e.target.value), priceRange[1]]))}
            placeholder="Mínimo"
          />
          <input
            type="number"
            min={priceRange[0]}
            value={priceRange[1]}
            onChange={e => dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))}
            placeholder="Máximo"
          />
        </PriceRange>
      </Section>
    </Panel>
  );
};

export default FilterPanel;