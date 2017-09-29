import _ from 'lodash';
import { MyCollection } from '/imports/collections';
import { myLogic } from '../logic';

export default ({author, documents = []}) => {
  const subGroup = documents
    .filter(myLogic)
    .map(doc => [doc.person._id, doc]);

  MyCollection.insert({
    author: {
      _id: author._id,
      name: author.name,
      path: author.path,
    },
    documents: _.fromPairs(subGroup),
  });
};
