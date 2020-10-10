import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import WarehousesCard from './WarehousesCard';
import WarehousesTitle from './WarehousesTitle';
import IconSearch from '../Icons/IconSearch';
import './WarehousesList.scss';
import FilterResults from 'react-filter-search';

class WarehousesList extends Component {
    state = {
        warehousesInfo: [],
        value: ''

    }

    getWarehousesList = () => {
        axios
            .get(`http://localhost:8080/warehouses/`)
            .then(res => {
                this.setState({
                    warehousesInfo: res.data
                    
                })
                console.log(this.state.warehousesInfo)

            })
    };

    componentDidMount() {
        this.getWarehousesList();
        console.log(this.state.warehousesInfo)
    };

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };


    render() {
        const { warehousesInfo, value } = this.state;
        return (
            <div className="container">
                <div className="warehouses">
                    <div className="warehouses__card-wrapper wrapper">
                        <div className="warehouses__card-content">
                            <div className="warehouses__header-container">
                                <div className="warehouses__header-left">Warehouses</div>

                                <div className="warehouses__header-right">
                                    <div className="warehouses__search-container input">
                                        <input type="text"
                                            value={value}
                                            onChange={this.handleChange}
                                            placeholder="Search ..."
                                            className="warehouses__search-input" />
                                        <IconSearch />
                                    </div>

                                    <Link to="/warehouse/warehouseAdd">
                                        <div className="warehouses__add-btn btn-large">
                                            + Add New Warehouse
                                        </div>
                                    </Link>

                                </div>
                            </div>

                            <WarehousesTitle />

                            <FilterResults
                                value={value}
                                data={warehousesInfo}
                                renderResults={results => (
                                    <div>
                                        {results.map(data => (
                                            <WarehousesCard
                                                key={data.id}
                                                id={data.id}
                                                warehouseId={data.id}
                                                name={data.name}
                                                address={data.address}
                                                city={data.city}
                                                country={data.country}
                                                contactname={data.contact.name}
                                                phone={data.contact.phone}
                                                email={data.contact.email}
                                            />
                                        ))}
                                    </div>
                                )} />
                        </div>
                    </div>


                </div>
                <footer className="footer">
                    <div className="footer-cont">
                    <p className="footer-cont__text">© InStock Inc. All Rights Reserved.</p>
                </div>
        </footer>
            </div>
        )
    }
}

export default WarehousesList;