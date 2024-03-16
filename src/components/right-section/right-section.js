import * as XLSX from "xlsx";
import {toast} from "react-toastify";
import QRCode from "qrcode";
import React, {useState} from "react";
import QrDetails from "../modal/qr-details";

export default  function RightSection() {
    const [highlight, setHighlight] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [invoiceDetails , setInvoiceDetails] = React.useState({});
    const handleOpen = () => setOpen(true);
    const processExcel = (e) => {
        e.preventDefault();

        let files = e.target.files, f = files[0];
        let reader = new FileReader();
        reader.onload = async function (e) {
            let data = e.target.result;

            try {
                // Load existing workbook
                const workbook = XLSX.read(data, { type: 'binary' });
                const wsname = workbook.SheetNames[1]; // Read the second sheet (index 1)
                const ws = workbook.Sheets[wsname];


                const masterList = workbook.SheetNames[0]; // Read the second sheet (index 1)
                const ml = workbook.Sheets[masterList];
                const dataParse = XLSX.utils.sheet_to_json(ml, { header: 1 });
                console.table(dataParse)

                const poNo = ws['H4'] ? ws['H4'].v : ''; // PO NO
                if(!poNo || !Number(poNo)){
                    toast.error("PO Number is invalid or empty");
                    return;
                }

                const poOrderItemNo = "10";
                const vendorInvoicePartQty = ws['E14'] ? ws['E14'].v : '';
                if(!vendorInvoicePartQty || !Number(vendorInvoicePartQty)){
                    toast.error("Vendor invoice Part Qty is invalid or empty");
                    return;
                }

                const gstInvoiceNo = ws['C4'] ? ws['C4'].v : ''; // GST NO
                if(!gstInvoiceNo){
                    toast.error("GST Number is invalid or empty");
                    return;
                }
                const invoiceDate = ws['C5'] ? ws['C5'].v : ''; // INVOICE DATE
                if(!invoiceDate){
                    toast.error("Invoice Date is invalid or empty");
                    return;
                }
                const grossRate =  ws['F14'] ? ws['F14'].v : '';
                if(!grossRate){
                    toast.error("Gross Rate is invalid or empty");
                    return;
                }

                const description = ws['B14'] ? ws['B14'].v : '';
                console.log("DESCRIPTION : " , description);
                const netRate = "00";
                const row = dataParse.findIndex(row => {
                    return row[1] === description
                })

                console.log("FROM MASTER LIST : ITEM : ", dataParse[row] , )
                const invoicePartNumber = dataParse[row][2];

                if(!(Number(invoicePartNumber) && invoicePartNumber.length === 12)){
                    toast.error("Invoice Part Number is invalid or empty");
                    return;
                }
                const vendorCode = "N00160";
                const taxValueCSGT = ws['J14'] ? ws['J14'].v : 0.00;
                const taxValueSGST = ws['L14'] ? ws['L14'].v : 0.00;
                const taxValueIGST = ws['N14'] ? ws['N14'].v : 0.00;
                const taxValueUGST = 0.00;

                const taxRateCSGT = ws['I14'] ? ws['I14'].v.toFixed(2)  : 0.00;
                const taxRateSGST = ws['K14'] ? ws['K14'].v.toFixed(2)    : 0.00;
                const taxRateIGST = ws['M14'] ? ws['M14'].v.toFixed(2)    : 0.00;
                const taxRateUGST = 0.00;

                const cess = 0.00;

                const totalInvoiceValue =  ws['M25'] ? ws['M25'].v : 0.00

                const hsnNode =  ws['H5'] ? ws['H5'].v : "";
                if(!hsnNode || !Number(hsnNode)){
                    toast.error("HSN Code is invalid or empty");
                    return;
                }
                console.log(taxRateSGST,"taxRateSGST")
                // Combine PONO, GSTNO, and INVOICEDATE into a single string

                const invoiceObj = {
                    poNo,
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
                    hsnNode
                }
                setInvoiceDetails(invoiceObj);
                handleOpen();
                //await generateQRCode(combinedData)
                e.target.value = ''

            } catch (error) {
                console.error('Error processing Excel file:', error);
            }
        };
        reader.readAsBinaryString(f);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = () => {
        setHighlight(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setHighlight(false);
        const files = e.dataTransfer.files;
        //handleFiles(files);
    };


    return (
        <div
            className={`right-section ${highlight ? 'highlight' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label htmlFor="fileInput" className="upload-label">QR generator for invoice</label>

            <div className="file-upload-container">
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    onChange={processExcel}
                />
                <label htmlFor="fileInput" className="drag-text">
                    Drag & Drop files here or click to upload
                </label>
            </div>
            <QrDetails open={open} invoiceObj={invoiceDetails} ></QrDetails>
        </div>
    )
}