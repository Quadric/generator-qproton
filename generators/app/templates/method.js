import _ from 'lodash';
import { MyCollection } from '/imports/collections';

export default ({ author }) => MyCollection.findOne({ 'author._id': author._id });
