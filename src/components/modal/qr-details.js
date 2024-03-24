import {Box, Button, InputLabel, Modal, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import QRCode from "qrcode";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '90%', // Limit the maximum height of the modal
    overflowY: 'auto', // Enable vertical scrolling when content exceeds modal's height
};
export default function QrDetails({ open , invoiceObj  }){
    const [openModel, setOpen] = useState(open);

    const [poNo, setPoNo] = useState(invoiceObj.poNo);
    const [poOrderItemNo, setPoOrderItemNo] = useState(invoiceObj.poOrderItemNo);
    const [vendorInvoicePartQty, setVendorInvoicePartQty] = useState(invoiceObj.vendorInvoicePartQty);
    const [gstInvoiceNo, setGstInvoiceNo] = useState(invoiceObj.gstInvoiceNo);
    const [invoiceDate, setInvoiceDate] = useState(invoiceObj.invoiceDate);
    const [grossRate, setGrossRate] = useState(invoiceObj.grossRate);
    const [netRate, setNetRate] = useState(invoiceObj.netRate);
    const [vendorCode, setVendorCode] = useState(invoiceObj.vendorCode)
    const [invoicePartNumber, setInvoicePartNumber] = useState(invoiceObj.invoicePartNumber)
    const [taxValueCSGT, setTaxValueCSGT] = useState(invoiceObj.taxValueCSGT);
    const [taxValueSGST, setTaxValueSSGT] = useState(invoiceObj.taxValueSGST);
    const [taxValueIGST, setTaxValueISGT] = useState(invoiceObj.taxValueIGST);
    const [taxValueUGST, setTaxValueUSGT] = useState(invoiceObj.taxValueUGST);
    const [taxRateCSGT, setTaxRateCSGT] = useState(invoiceObj.taxRateCSGT);
    const [taxRateSGST, setTaxRateSGST] = useState(invoiceObj.taxRateSGST);
    const [taxRateIGST, setTaxRateIGST] = useState(invoiceObj.taxRateIGST);
    const [taxRateUGST, setTaxRateUGST] = useState(invoiceObj.taxRateUGST);
    const [cess, setCess] = useState(invoiceObj.cess);
    const [totalInvoiceValue, setTotalInvoiceValue] = useState(invoiceObj.totalInvoiceValue);
    const [hsnNode, setHsnNode] = useState(invoiceObj.hsnNode);

    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    }

    useEffect(() => {
        setOpen(open)
    }, [open]);

    useEffect(() => {
        const { poNo,
            poOrderItemNo,
            vendorInvoicePartQty,
            gstInvoiceNo,
            invoiceDate,
            grossRate,
            netRate,
            vendorCode,
            invoicePartNumber,
            taxValueCSGT,
            taxValueSGST,
            taxValueIGST,
            taxValueUGST,
            taxRateCSGT,
            taxRateSGST,
            taxRateIGST,
            taxRateUGST,
            cess,
            totalInvoiceValue,
            hsnNode } = invoiceObj;

        setPoNo(poNo)
        setPoOrderItemNo(poOrderItemNo)
        setVendorInvoicePartQty(vendorInvoicePartQty)
        setGstInvoiceNo(gstInvoiceNo)
        setInvoiceDate(invoiceDate)
        setGrossRate(grossRate)
        setNetRate(netRate)
        setVendorCode(vendorCode)
        setInvoicePartNumber(invoicePartNumber)
        setTaxValueCSGT(taxValueCSGT)
        setTaxValueSSGT(taxValueSGST)
        setTaxValueISGT(taxValueIGST)
        setTaxValueUSGT(taxValueUGST)
        setTaxRateCSGT(taxRateCSGT)
        setTaxRateSGST(taxRateSGST)
        setTaxRateIGST(taxRateIGST)
        setTaxRateUGST(taxRateUGST)
        setCess(cess)
        setTotalInvoiceValue(totalInvoiceValue)
        setHsnNode(hsnNode)




    }, [invoiceObj]);

    const generateQRCode = async()  => {

        const combinedData = `${poNo},${poOrderItemNo},${vendorInvoicePartQty},${gstInvoiceNo},${invoiceDate},${grossRate},${netRate}${vendorCode},${taxValueCSGT},${taxValueSGST},${taxValueIGST},${taxValueUGST},${taxRateCSGT},${taxRateSGST},${taxRateIGST},${taxRateUGST},${cess},${totalInvoiceValue},${hsnNode}`;
        // Generate QR code for the combined data
        const qrCodeDataURL = await QRCode.toDataURL(combinedData);
        // Create a link element
        const link = document.createElement('a');
        link.href = qrCodeDataURL;
        link.download = `${gstInvoiceNo}.png`;
        console.log("Link :", link)
        // Trigger a click event on the link
        link.click();

        window.location.reload()
    }
    return (
        <Modal
            open={openModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'gray',
                            }}>
                    <CancelIcon/>
                </IconButton>
                {/*<Typography className="pb-3" id="modal-modal-title" variant="h6" component="h2">*/}
                {/*    QR Details*/}
                {/*</Typography>*/}
                {/*<Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
                {/*    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
                {/*</Typography>*/}
                <div>
                    <TextField style={{marginBottom: '10px'}} label="Po Number" onChange={(e) => {
                        setPoNo(e.target.value)
                    }} value={poNo}> </TextField>
                    <TextField style={{marginBottom: '10px'}} label="PO order item no" onChange={(e) => {
                        setPoOrderItemNo(e.target.value)
                    }} value={poOrderItemNo}> </TextField>
                </div>
                <div>
                    <TextField style={{marginBottom: '10px'}} label="Vendor Invoice Part Qty" onChange={(e) => {
                        setVendorInvoicePartQty(e.target.value)
                    }} value={vendorInvoicePartQty}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Vendor GST Invoices No" onChange={(e) => {
                        setGstInvoiceNo(e.target.value)
                    }} value={gstInvoiceNo}> </TextField>
                </div>
                <div>
                    <TextField style={{marginBottom: '10px'}} label="Vendor Invoice date" onChange={(e) => {
                        setInvoiceDate(e.target.value)
                    }} value={invoiceDate}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Vendor Invoice Basic / Gross Rate"
                               onChange={(e) => {
                                   setGrossRate(e.target.value)
                               }} value={grossRate}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Vendor Invoice Net Rate"
                               onChange={(e) => {
                                   setNetRate(e.target.value)
                               }} value={netRate}> </TextField>
                    <TextField style={{marginBottom: '10px'}} label="Vendor Code"
                               onChange={(e) => {
                                   setVendorCode(e.target.value)
                               }} value={vendorCode}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Invoice Part Number"
                               onChange={(e) => {
                                   setInvoicePartNumber(e.target.value)
                               }} value={invoicePartNumber}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Tax values CGST"
                               onChange={(e) => {
                                   setTaxValueCSGT(e.target.value)
                               }} value={taxValueCSGT}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Tax values SGST"
                               onChange={(e) => {
                                   setTaxValueSSGT(e.target.value)
                               }} value={taxValueSGST}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Tax values IGST"
                               onChange={(e) => {
                                   setTaxValueISGT(e.target.value)
                               }} value={taxValueIGST}> </TextField>
                </div>


                <div>
                    <TextField style={{marginBottom: '10px'}} label="Tax values UGST"
                               onChange={(e) => {
                                   setTaxValueUSGT(e.target.value)
                               }} value={taxValueUGST}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Tax Rates CGST %"
                               onChange={(e) => {
                                   setTaxRateCSGT(e.target.value)
                               }} value={taxRateCSGT}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Tax Rates SGST %"
                               onChange={(e) => {
                                   setTaxRateSGST(e.target.value)
                               }} value={taxRateSGST}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="Tax Rates IGST %"
                               onChange={(e) => {
                                   setTaxRateIGST(e.target.value)
                               }} value={taxRateIGST}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Tax Rates UGST %"
                               onChange={(e) => {
                                   setTaxRateUGST(e.target.value)
                               }} value={taxRateUGST}> </TextField>


                    <TextField style={{marginBottom: '10px'}} label="Cess"
                               onChange={(e) => {
                                   setCess(e.target.value)
                               }} value={cess}> </TextField>
                </div>

                <div>
                    <TextField style={{marginBottom: '10px'}} label="Total Invoice Value"
                               onChange={(e) => {
                                   setTotalInvoiceValue(e.target.value)
                               }} value={totalInvoiceValue}> </TextField>

                    <TextField style={{marginBottom: '10px'}} label="HSN / SAC Code"
                               onChange={(e) => {
                                   setHsnNode(e.target.value)
                               }} value={hsnNode}> </TextField>
                </div>

                <div>
                    <Button variant="contained" onClick={generateQRCode}>Generate QR Code</Button>
                </div>
            </Box>
        </Modal>
    );
}