let mass_lower = 600.0;
let mass_upper = 1200.0;
let aper_lower = 100.0;
let aper_upper = 400.0;
let forc_lower = 550.0;
let forc_upper = 2250.0;
let turb_lower = 0.001;
let turb_upper = 1.0;
let chao_lower = 0.001;
let chao_upper = 0.002;
let deta_lower = 4.0;
let deta_upper = 10.0;
let final_sat = 0.0;
let gradlev = 0;

let data = [];

function evaluate(n, metadata) {
  let meta = {
    description: "",
    prob: 0,
  };

  let points = {
    form: 0,
    rare: 0,
  };

  if (n === 1.0) {
    meta.desciption = "absolute";
    points.rare = 2;
    points.form = 7;
    meta.prob = 0.001;
  } else if (n === 0.0) {
    meta.desciption = "void";
    points.rare = 2;
    points.form = 7;
    meta.prob = 0.001;
  } else if (n <= 0.01) {
    meta.desciption = "minimal";
    points.rare = 1;
    points.form = 5;
    meta.prob = 0.01;
  } else if (n > 0.01 && n < 0.1) {
    meta.desciption = "marginal";
    points.form = 3;
    meta.prob = 0.09;
  } else if (n > 0.1 && n < 0.25) {
    meta.desciption = "low";
    points.form = 1;
    meta.prob = 0.15;
  } else if (n > 0.99) {
    meta.desciption = "extreme";
    points.rare = 1;
    points.form = 5;
    meta.prob = 0.01;
  } else if (n < 0.99 && n > 0.9) {
    meta.desciption = "super";
    points.form = 3;
    meta.prob = 0.09;
  } else if (n < 0.9 && n > 0.75) {
    meta.desciption = "high";
    points.form = 1;
    meta.prob = 0.15;
  } else {
    meta.desciption = "average";
    meta.prob = 0.5;
  }

  return metadata ? meta : points;
}

function generate_artblocks_metadata(formdata) {
  let meta_mass = evaluate(formdata.mass, true);
  let meta_force = evaluate(formdata.force, true);
  let meta_symmetry = evaluate(formdata.symmetry, true);
  let meta_turbulence = evaluate(formdata.turbulence, true);
  let meta_chaos = evaluate(formdata.chaos, true);

  let prob =
    meta_mass.prob *
    meta_force.prob *
    meta_symmetry.prob *
    meta_turbulence.prob *
    meta_chaos.prob;

  let massstr =
    "Mass: " +
    (formdata.mass * 100).toFixed(1) +
    "% [" +
    meta_mass.desciption.toUpperCase() +
    "]";
  let forcestr =
    "Force: " +
    (formdata.force * 100).toFixed(1) +
    "% [" +
    meta_force.desciption.toUpperCase() +
    "]";
  let symstr =
    "Symmetry: " +
    (formdata.symmetry * 100).toFixed(1) +
    "% [" +
    meta_symmetry.desciption.toUpperCase() +
    "]";
  let turbstr =
    "Turbulence: " +
    (formdata.turbulence * 100).toFixed(1) +
    "% [" +
    meta_turbulence.desciption.toUpperCase() +
    "]";
  let chaosstr =
    "Chaos: " +
    (formdata.chaos * 100).toFixed(1) +
    "% [" +
    meta_chaos.desciption.toUpperCase() +
    "]";
  let prostr = "Chance: 1 in " + Math.trunc(1.0 / prob);
  let satstr = "Saturation: " + (final_sat * 100).toFixed(1) + "%";
  let gradstr = "Colour Set: " + gradlev;

  return [
    massstr,
    forcestr,
    symstr,
    turbstr,
    chaosstr,
    satstr,
    gradstr,
    prostr,
  ];
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function process_formdata(hashdata) {
  let idx_mass = 1;
  let idx_aperture = 2;
  let idx_force = 3;
  let idx_symmetry = 4;
  let idx_turbulence = 5;
  let idx_chaos = 6;
  let idx_saturation = 7;
  let idx_detail = 8;

  let formdata = {
    mass: hashdata[idx_mass],
    aperture: hashdata[idx_aperture],
    force: hashdata[idx_force],
    symmetry: hashdata[idx_symmetry],
    turbulence: hashdata[idx_turbulence],
    chaos: hashdata[idx_chaos],
    saturation: hashdata[idx_saturation],
    detail: hashdata[idx_detail],
  };

  return formdata;
}

function evaluate_points(fd) {
  let points_mass = evaluate(fd.mass, false);
  let points_force = evaluate(fd.force, false);
  let points_symmetry = evaluate(fd.symmetry, false);
  let points_turbulence = evaluate(fd.turbulence, false);
  let points_chaos = evaluate(fd.chaos, false);

  let points = {
    form:
      points_mass.form +
      points_force.form +
      points_symmetry.form +
      points_turbulence.form +
      points_chaos.form,

    rare:
      points_mass.rare +
      points_force.rare +
      points_symmetry.rare +
      points_turbulence.rare +
      points_chaos.rare,
  };

  return points;
}

function generate_renderdata(fd) {
  let points = evaluate_points(fd);

  let renderdata = {
    mass: lerp(mass_lower, mass_upper, fd.mass),
    aperture: lerp(aper_lower, aper_upper, fd.aperture),
    force: lerp(forc_lower, forc_upper, fd.force),
    symmetry: 1.0 - fd.symmetry,
    turbulence: lerp(turb_lower, turb_upper, fd.turbulence),
    chaos: lerp(chao_lower, chao_upper, fd.chaos),
    saturation: fd.saturation,
    form_points: points.form,
    rare_points: points.rare,
    detail: lerp(deta_lower, deta_upper, fd.detail),
  };

  return renderdata;
}

function process_hash(txn) {
  let hash_index = 0;

  for (let i = 2; i < 65; i += 2) {
    let from = i;
    let to = i + 2;
    let s = txn.substring(from, to);

    data[hash_index] = parseInt(s, 16) / 255.0;

    hash_index++;
  }

  return data;
}

async function init(txn) {
  let hashdata = process_hash(txn);
  let formdata = process_formdata(hashdata);
  let renderdata = generate_renderdata(formdata);

  render(renderdata);

  let ab_metadata = generate_artblocks_metadata(formdata);

  return ab_metadata;
}
let sat;

function render(rd) {
  gradlev = rd.rare_points + 1;

  if (rd.form_points === 0) {
    sat = 0.0;
  } else if (rd.form_points > 0 && rd.form_points < 7) {
    sat = lerp(0.0, 0.25, rd.saturation);
  } else if (rd.form_points >= 7 && rd.form_points < 9) {
    sat = lerp(0.2, 0.75, rd.saturation);
  } else if (rd.form_points >= 9 && rd.form_points < 10) {
    sat = lerp(0.75, 0.9, rd.saturation);
  } else if (rd.form_points >= 10 && rd.form_points < 11) {
    sat = lerp(0.9, 1.0, rd.saturation);
  } else {
    sat = 1.0;
  }

  final_sat = sat;
}

//   features = init(tokenData);

module.exports = { init };
