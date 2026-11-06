/** Pure menu functions, shared by the app and its automated tests. */
const COURSES = Object.freeze(['Starter', 'Main Course', 'Dessert', 'Drinks']);

function normalize(value) {
  return String(value == null ? '' : value).trim();
}

function validateMenu(form) {
  const name = normalize(form.name);
  const description = normalize(form.description);
  const course = normalize(form.course);
  const priceText = normalize(form.price).replace(',', '.');
  const errors = {};

  if (!name) errors.name = 'Please enter a dish name.';
  else if (name.length > 70) errors.name = 'Dish name must be 70 characters or fewer.';

  if (!description) errors.description = 'Please add a short description.';
  else if (description.length > 300) errors.description = 'Description must be 300 characters or fewer.';

  if (!COURSES.includes(course)) errors.course = 'Please select a valid course.';

  if (!/^\d+(?:\.\d{1,2})?$/.test(priceText) || !Number.isFinite(Number(priceText)) || Number(priceText) <= 0 || Number(priceText) > 99999.99) {
    errors.price = 'Enter a price from R0.01 to R99 999.99 (up to 2 decimals).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      description,
      course,
      price: Number(priceText)
    }
  };
}

function searchAndFilter(items, query, course) {
  const q = normalize(query).toLowerCase();
  return items.filter((item) => {
    const matchesSearch = !q || [item.name, item.description].some((value) => String(value).toLowerCase().includes(q));
    return matchesSearch && (!course || course === 'All' || item.course === course);
  });
}

function menuStatistics(items) {
  const counts = Object.fromEntries(COURSES.map((course) => [course, 0]));
  let total = 0;
  let cheapest = null;
  let mostExpensive = null;

  items.forEach((item) => {
    if (Object.hasOwn(counts, item.course)) counts[item.course] += 1;
    total += item.price;
    if (!cheapest || item.price < cheapest.price) cheapest = item;
    if (!mostExpensive || item.price > mostExpensive.price) mostExpensive = item;
  });

  return {
    totalItems: items.length,
    averagePrice: items.length ? total / items.length : 0,
    totalMenuValue: total,
    counts,
    cheapest,
    mostExpensive
  };
}

function formatPrice(amount) {
  return `R${Number(amount || 0).toFixed(2)}`;
}

module.exports = { COURSES, validateMenu, searchAndFilter, menuStatistics, formatPrice };
