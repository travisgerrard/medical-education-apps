import React from 'react';
import Link from 'next/link';

function AllPosts() {
  const postFileNamesTemp =
    preval`
    const fs = require('fs')
    const path = require('path');

    function flatten(lists) {
      return lists.reduce((a, b) => a.concat(b), []);
    }

    function getDirectories(srcpath) {
      return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory());
    }

    function getDirectoriesRecursive(srcpath) {
      const listOfDirectores = [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]
      const linkToListOfDirectories = listOfDirectores.filter(element => {
        const links = element.split('pages/');
        if (links.length > 1) {
          return links[1];
        }
      });
      return listOfDirectores;
    }



    module.exports = getDirectoriesRecursive('./pages');` || [];
  var linksToDisplay = [];
  postFileNamesTemp.forEach((element) => {
    const links = element.split('pages/');
    console.log(element);
    console.log(links);
    if (links.length > 1) {
      console.log(links[1]);
      linksToDisplay.push(links[1]);
      return links[1];
    }
  });

  // console.log(postFileNamesTemp);
  console.log(linksToDisplay);

  return (
    <div>
      React function with all posts
      {linksToDisplay.map((linksNames) => {
        return (
          <Link href={linksNames} key={linksNames}>
            <div>{linksNames}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default AllPosts;
