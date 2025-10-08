import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export default function useChartExport() {
    const exportAsImage = async (elementId: string, fileName: string = 'chart') => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: false,
            });

            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error al exportar imagen:', error);
        }
    };

    const exportAsPDF = async (elementId: string, fileName: string = 'chart') => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF({
                orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            let finalWidth = imgWidth;
            let finalHeight = imgHeight;
            
            if (imgHeight > pdfHeight - 20) {
                finalHeight = pdfHeight - 20;
                finalWidth = (canvas.width * finalHeight) / canvas.height;
            }
            
            const xOffset = (pdfWidth - finalWidth) / 2;
            const yOffset = 10;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('Error al exportar PDF:', error);
        }
    };

    const exportDashboardCompletePDF = async (containerId: string, fileName: string = 'dashboard-completo') => {
        const element = document.getElementById(containerId);
        if (!element) return;

        try {
            const originalOverflow = element.style.overflow;
            const originalHeight = element.style.height;
            const originalMaxHeight = element.style.maxHeight;
            
            element.style.overflow = 'visible';
            element.style.height = 'auto';
            element.style.maxHeight = 'none';

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: false,
                scrollY: -window.scrollY,
                scrollX: -window.scrollX,
            });

            element.style.overflow = originalOverflow;
            element.style.height = originalHeight;
            element.style.maxHeight = originalMaxHeight;

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgAspectRatio = canvas.width / canvas.height;
            const pdfAspectRatio = pdfWidth / pdfHeight;
            
            let finalWidth, finalHeight;
            
            if (imgAspectRatio > pdfAspectRatio) {
                finalWidth = pdfWidth - 20;
                finalHeight = finalWidth / imgAspectRatio;
            } else {
                finalHeight = pdfHeight - 20;
                finalWidth = finalHeight * imgAspectRatio;
            }
            
            const xOffset = (pdfWidth - finalWidth) / 2;
            const yOffset = (pdfHeight - finalHeight) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('Error al exportar dashboard completo:', error);
        }
    };

    const exportDashboardCompleteImage = async (containerId: string, fileName: string = 'dashboard-completo') => {
        const element = document.getElementById(containerId);
        if (!element) return;

        try {
            const originalOverflow = element.style.overflow;
            const originalHeight = element.style.height;
            const originalMaxHeight = element.style.maxHeight;
            
            element.style.overflow = 'visible';
            element.style.height = 'auto';
            element.style.maxHeight = 'none';

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: false,
                scrollY: -window.scrollY,
                scrollX: -window.scrollX,
            });

            element.style.overflow = originalOverflow;
            element.style.height = originalHeight;
            element.style.maxHeight = originalMaxHeight;

            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error al exportar dashboard como imagen:', error);
        }
    };

    return { 
        exportAsImage, 
        exportAsPDF,
        exportDashboardCompletePDF,
        exportDashboardCompleteImage
    };
};