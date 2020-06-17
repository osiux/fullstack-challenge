import PDFDocument from 'pdfkit';

import { Tour } from '../types';

const generatePdf = async (tour: Tour) => {
    const doc = new PDFDocument();

    doc.font('Times-Bold').text('Name: ', 100, 80);
    doc.font('Times-Roman').text(tour.name || 'N/A', 180, 80);

    doc.font('Times-Bold').text('Created at:', 100, 100);
    doc.font('Times-Roman').text(
        tour.createdAt ? tour.createdAt.toISOString() : '',
        180,
        100
    );

    doc.font('Times-Bold').text('Link:', 100, 120);
    doc.font('Times-Roman')
        .fillColor('blue')
        .text('View in Browser', 180, 120, {
            link: `https://tourpicker.herokuapp.com/tour/${tour.id}`,
        })
        .fillColor('black');

    doc.font('Times-Bold').fontSize(20).text('Stops', 100, 150);
    doc.moveDown();

    tour.places.map((place) => {
        doc.font('Times-Bold')
            .fillColor('black')
            .fontSize(12)
            .text('Name:', 100);
        doc.font('Times-Roman').text(place.name);
        doc.font('Times-Bold').text('Address:');
        doc.font('Times-Roman').text(place.location.display_address.join(', '));
        doc.font('Times-Bold').text('Phone:');
        doc.font('Times-Roman').text(place.display_phone || 'N/A');
        doc.font('Times-Bold').text('Rating:');
        doc.font('Times-Roman').text(place.rating.toString());
        doc.font('Times-Bold').fillColor('blue').text('View in Yelp', {
            link: place.url,
        });
        doc.moveDown();
    });

    return doc;
};

export default generatePdf;
