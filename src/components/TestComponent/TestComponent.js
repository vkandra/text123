import './TestComponent.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { CustomerService } from './CustomerService';
import { ProductService } from './ProductService';

const TestComponent = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    code: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    category: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    quantity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getProductsSmall()
      .then((data) => setProducts(getProducts(data)));
  }, []);

  // Date
  const getProducts = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const dateFilterTemplate = (items) => {
    return (
      <Calendar
        value={items.value}
        onChange={(e) => items.filterCallback(e.value, items.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };
  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Global Filter
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    console.log(_filters);
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="m-0">Customers</span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  // Dropdown Filter Items
  const categoryItemTemplate = (item) => {
    return <div className="p-multiselect-representative-option">{item}</div>;
  };

  const category = ['Accessories', 'Fitness', 'Clothing', 'Electronics'];
  const categoryFilterTemplate = (items) => {
    console.log(items);
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Category Selector</div>
        <MultiSelect
          value={items.value}
          options={category}
          itemTemplate={categoryItemTemplate}
          onChange={(e) => items.filterCallback(e.value)}
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  // Price
  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const priceFilterTemplate = (items) => {
    return (
      <InputNumber
        value={items.value}
        onChange={(e) => items.filterCallback(e.value, items.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
        placeholder="Search By Price"
      />
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  // Button
  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog"></Button>;
  };

  return (
    <div className="testComponent">
      <div>
        <DataTable
          value={products}
          responsiveLayout="scroll"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5, 10, 20]}
          size="small"
          selection={selectedProduct1}
          onSelectionChange={(e) => setSelectedProduct1(e.value)}
          header={header}
          filters={filters}
          scrollable
          scrollHeight="50vh"
          emptyMessage="No customers found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            selectionMode="multiple"
            className="checkboxCell"
            style={{
              maxWidth: '3em',
            }}
          ></Column>
          <Column
            field="code"
            header="Code"
            sortable
            filter
            filterPlaceholder="Search by code"
            style={{ minWidth: '8rem' }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            style={{ minWidth: '10rem', maxWidth: '10rem' }}
            filterPlaceholder="Search by name"
          ></Column>
          <Column
            field="category"
            header="Category"
            sortable
            filter
            showFilterMatchModes={false}
            filterElement={categoryFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            sortable
            dataType="numeric"
            filterPlaceholder="Search by Qty."
            style={{ minWidth: '8rem' }}
            filter
          ></Column>
          <Column
            field="date"
            header="Date"
            sortable
            filter
            // filterField="date"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: '6rem' }}
            filterElement={dateFilterTemplate}
          ></Column>
          <Column
            field="price"
            header="Price"
            sortable
            dataType="numeric"
            style={{ minWidth: '8rem' }}
            filter
            body={priceBodyTemplate}
            filterElement={priceFilterTemplate}
          ></Column>
          <Column
            headerStyle={{
              width: '4rem',
              textAlign: 'center',
              maxWidth: '4rem',
            }}
            bodyStyle={{
              textAlign: 'center',
              overflow: 'visible',
              width: '4rem',
              maxWidth: '4rem',
            }}
            body={actionBodyTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TestComponent);

// export default TestComponent;
