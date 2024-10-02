import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

function ShippingPolicy() {
    return (
        <>
            <Meta title={'Shipping Policy'} />
            <BreadCrumb title="Shipping Policy" />
            <Container className="policy-wrapper py-5 home-wrapper-2">
                <div className="col-12">
                    <div className="policy">
                        <h2>Shipping Policy</h2>
                        <h3>Processing and Delivery Time</h3>
                        <p>
                            We strive to process and ship orders as quickly as possible. Once your order has been placed, it will typically be processed within 1-2 business days. Please note that during peak seasons or promotional periods, processing times may be slightly longer.
                        </p>
                        <p>
                            The estimated delivery time will depend on your location and the shipping method selected at checkout. We offer various shipping options, including standard shipping and expedited shipping. The estimated delivery time for each shipping method will be provided during the checkout process.
                        </p>
                        <h3>Shipping Rates</h3>
                        <p>
                            Shipping rates are calculated based on the weight of the products in your order and the destination address. During the checkout process, you will be able to view the shipping options available for your order along with the corresponding shipping rates.
                        </p>
                        <p>
                            We may offer free shipping promotions for eligible orders. Please refer to the specific promotion details for any applicable terms and conditions.
                        </p>
                        <h3>Order Tracking</h3>
                        <p>
                            Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to track the progress of your order through our shipping carrier's website.
                        </p>
                        <h3>International Shipping</h3>
                        <p>
                            We offer international shipping to select countries. The availability of international shipping and the applicable shipping rates will be displayed during the checkout process based on your destination address.
                        </p>
                        <p>
                            Please note that international orders may be subject to customs duties, taxes, and import fees imposed by the destination country. These additional charges are the responsibility of the recipient and are not included in the order total or shipping cost.
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ShippingPolicy;
